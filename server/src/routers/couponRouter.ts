import { publicProcedure, T } from "../..";
import { z } from "zod";
import { read, write } from "../database/utils";

export const couponRouter = (t: T) =>
  t.router({
    issuedList: publicProcedure.input(z.object({ userId: z.string() })).query(({ input }) => {
      const data = read({ fileName: "coupons" });
      return data.filter((coupon) => coupon.issuerId === input.userId);
    }),
    receivedList: publicProcedure.input(z.object({ userId: z.string() })).query(({ input }) => {
      const data = read({ fileName: "coupons" });
      return data.filter((coupon) => coupon.receiverId === input.userId);
    }),
    issue: publicProcedure
      .input(
        z.object({
          title: z.string(),
          desc: z.string(),
          expiredAt: z.string(),
          userId: z.string(),
          receiverId: z.string(),
        })
      )
      .mutation(({ input }) => {
        const data = read({ fileName: "coupons" });

        const newCoupon = {
          id: `coupon-${data.length}`,
          title: input.title,
          desc: input.desc,
          issuedAt: new Date().toLocaleString(),
          expiredAt: input.expiredAt,
          isUsed: false,
          issuerId: input.userId,
          receiverId: input.receiverId,
        };

        const newData = { coupons: [...data, newCoupon] };
        write({ fileName: "coupons", data: newData });

        return newCoupon;
      }),
    use: publicProcedure
      .input(z.object({ userId: z.string(), couponId: z.string() }))
      .mutation(({ input }) => {
        const data = read({ fileName: "coupons" });
        const targetCoupon = data.find(
          (coupon) =>
            coupon.id === input.couponId &&
            coupon.receiverId === input.userId &&
            coupon.isUsed === false
        );

        if (!targetCoupon) {
          // todo
          return;
        }

        const newCoupons = data.map((coupon) => {
          if (coupon.id === targetCoupon.id) {
            return {
              ...coupon,
              isUsed: true,
            };
          }
        });

        write({ fileName: "coupons", data: { coupons: newCoupons } });

        return {
          couponId: input.couponId,
          isUsed: true,
        };
      }),
  });
