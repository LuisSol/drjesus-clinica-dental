import styled from "styled-components";
import { parseCookies, setCookie } from "nookies";
import requestPromise from "request-promise";
import {
  verifyToken,
  getUserData,
  getUserFirestore,
  getServicesData,
} from "../src/utils/firebaseAdmin";
import flasher from "../src/utils/flasher";

import MainLayout from "../src/components/MainLayout";
import AppointmentsFooter from "../src/components/citas/AppointmentsFooter";
import AppointmentForm from "../src/components/citas/AppointmentForm";
import DentistsSvg from "../src/components/citas/DentistsSvg";

const FullWidthDiv = styled.div`
  width: 100%;
`;
const SchedulerContainer = styled.main`
  width: 1020px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  @media (max-width: 1020px) {
    width: 100%;
  }
`;

const Citas = ({
  redirect,
  flash,
  date,
  userData,
  services,
  selectedService,
}) => {
  /* if the result is a redirect 
       due to present lack of getServerSide support for redirects from client side */
  if (redirect) {
    if (process.browser) {
      flasher(flash?.msg, flash?.type, redirect);
    }
    return null;
  }

  return (
    <MainLayout title="Citas">
      <FullWidthDiv>
        <SchedulerContainer>
          <AppointmentForm
            {...userData}
            services={services}
            selectedService={selectedService || {}}
            date={date}
          />
          <DentistsSvg />
        </SchedulerContainer>
      </FullWidthDiv>
      <AppointmentsFooter />
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const retrieveSchedulerData = async (uid) => {
    // retrieve data from the database
    const data = {};
    const [userAuthData, userFireStoreData, servicesData] = await Promise.all([
      getUserData(uid),
      getUserFirestore(uid),
      getServicesData(),
    ]);
    const authData = userAuthData.toJSON();
    const userData = userFireStoreData.data();
    // set user data as props
    data.userData = {
      uid,
      name: authData.displayName || "",
      phone: userData?.phone || "",
    };
    // populate the services from the data in the firestore database
    data.services = [];
    servicesData.docs.forEach((doc) => {
      data.services.push({ ...doc.data(), id: doc.id });
    });
    return data;
  };

  if (ctx.query.service && ctx.query.duration && ctx.query.time) {
    props.selectedService = {
      service: ctx.query.service,
      duration: ctx.query.duration,
      timeBlocks: ctx.query.time,
    };
  }
  const { auth } = parseCookies(ctx);
  if (!auth) {
    props.redirect = "/ingresar";
    props.flash = {
      msg: "Ingresa a tu cuenta para acceder a este recurso",
      type: "warn",
    };
  } else {
    const token = JSON.parse(auth);
    try {
      const { uid } = await verifyToken(token.xa);
      // valid Token
      const data = await retrieveSchedulerData(uid);
      props = { ...props, ...data };
    } catch (error) {
      /* Token has expired */
      console.error("ERROR ---- ", error);
      // try to refresh the Id Token
      try {
        /* try to retrieve a new Id token */
        const response = await requestPromise.post(
          `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
          {
            form: {
              grant_type: "refresh_token",
              refresh_token: token.refreshToken,
            },
          }
        );
        const payload = JSON.parse(response);
        if (payload.id_token && payload.refresh_token) {
          const uid = payload.user_id;
          const xa = payload.id_token;
          const refreshToken = payload.refresh_token;
          // update cookie
          setCookie(ctx, "auth", JSON.stringify({ xa, uid, refreshToken }), {
            maxAge: 60 * 60 * 24,
            path: "/",
          });
          const data = await retrieveSchedulerData(uid);
          props = { ...props, ...data };
        } else {
          // refresh token is invalid for some reason like password change, black listed account etc..
          props.redirect = "/logout";
        }
      } catch (error) {
        console.error("ERROR ----- ", error);
      }
    }
  }
  return { props };
};

export default Citas;
