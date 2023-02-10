import { trpc } from "../../utils/trpc";

const useCouponService = () => {
  const queryIssuedList = () => {
    const result = trpc.issuedList.useQuery();
    return result;
  };

  const queryReceivedList = () => {
    const result = trpc.receivedList.useQuery();
    return result;
  };

  const issue = () => {
    const result = trpc.issue.useMutation();
    return result;
  };

  const use = () => {
    const result = trpc.use.useMutation();
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
