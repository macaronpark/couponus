import styles from "./IndexPage.module.css";
import IssuedCouponList from "./IssuedCouponList";
import ReceivedCouponList from "./ReceivedCouponList";

const IndexPage = () => {
  return (
    <div>
      <IssuedCouponList />
      <ReceivedCouponList />
    </div>
  );
};

export default IndexPage;
