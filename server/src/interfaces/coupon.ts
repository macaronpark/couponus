export interface Coupon {
  id: string;
  title: string;
  desc: string;
  issuedAt: string;
  expiredAt: string;
  isUsed: boolean;
  issuerId: string;
  receiverId: string;
}
