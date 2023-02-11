import { trpc } from "../../utils/trpc";

const useCouponService = () => {
  const queryIssuedList = () => {
    const result = trpc.coupon.issuedList.useQuery({ userId: "user-szpark" });
    return result;
  };

  const queryReceivedList = () => {
    const result = trpc.coupon.receivedList.useQuery({ userId: "user-szpark" });
    return result;
  };

  const issue = () => {
    const result = trpc.coupon.issue.useMutation();
    return result;
  };

  const use = () => {
    const result = trpc.coupon.use.useMutation();
    return result;
  };

  return {
    couponService: {
      queryIssuedList,
      queryReceivedList,
      issue,
      use,
    },
  };
};

export default useCouponService;
