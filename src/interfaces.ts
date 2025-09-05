export interface Data<T> {
  data: T;
}

export interface Transaction {
  id: number;
  number: string;
  transactionStatus: TransactionStatus;
  paymentStatus: PaymentStatus;
  customerId: number;
  customer: Customer;
  subtotal: number;
  additionalCost?: string | null;
  additionalCostAmount: number;
  pickupDeliveryFee: number;
  discount: number;
  total: number;
  advancePaymentMethodId: number | null;
  advancePaymentMethod: PaymentMethod | null;
  advancePaymentAmount: number | null;
  advancePaymentDate: string | null;
  settlementPaymentMethodId: number | null;
  settlementPaymentMethod: PaymentMethod | null;
  settlementPaymentAmount: number | null;
  settlementPaymentDate: string | null;
  cashPaymentAmount?: number;
  cashChange?: number;
  estCompletionDatetime: string;
  perfumeId?: number | null;
  perfume?: Perfume | null;
  isDeposit: boolean;
  isPickupDelivery: boolean;
  note?: string;
  rack?: string;
  cancelReason?: string;
  createdAt: string;
  completedAt: string;
  canceledAt: string;
  pickupDeliveryAddress?: {
    address: string
  };
  user: User;
  transactionItems: TransactionItem[];
  outlet: Outlet;
}

export interface TransactionItem {
  id: number;
  transaction: Transaction;
  serviceId: number;
  service: Service;
  price: number;
  unitId: number;
  unit: Unit;
  total: number;
  quantity: number;
  status: TransactionItemStatus;
  images: TransactionItemImage[];
  processes: TransactionItemProcess[];
  details: TransactionItemDetail[];
  itemDetails?: string;
  completedAt?: string | null;
  completedBy?: User | null;
}

export type TransactionItemStatus = 'Antrian' | 'Proses' | 'Selesai';

export interface TransactionItemDetail {
  id: number;
  transactionItemId: number;
  itemId: number;
  quantity: number;
  item: Item;
}

export interface Item {
  id: number;
  name: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export type TransactionStatus =
  | 'Penjemputan'
  | 'Antrian'
  | 'Proses'
  | 'Siap Diantar'
  | 'Siap Diambil'
  | 'Selesai'
  | 'Batal';

export type PaymentStatus = 'Belum Lunas' | 'DP' | 'Lunas';

export interface Customer {
  id: number;
  name: string;
  balance: number;
}

export interface Perfume {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
  serviceCategory?: ServiceCategory;
}

export interface ServiceCategory {
  id: number;
  name: string;
}

export interface Unit {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}

export interface TransactionItemImage {
  id: number;
  transactionItemId: number;
  image: string;
}

export interface TransactionItemProcess {
  id: number;
  transactionItemId: number;
  processId: number;
  processedAt: string | null;
  processedById: number | null;
  processedBy: User | null;
  process: Process;
}

export interface Process {
  id: number;
  name: string;
  icon: 'wash-machine' | 'hanger-2' | 'ironing' | 'stack-2' | 'archive-check';
}

export interface Outlet {
  id: number;
  name: string;
  phone: string;
  cityId: number;
  city: City;
  address: string;
  isPro: boolean;
  receiptSetting?: ReceiptSetting;
}

export type MessageTextAlign = 'LEFT' | 'CENTER' | 'RIGHT';

export interface ReceiptSetting {
  logo?: string | null;
  additionalInfo?: string | null;
  message?: string | null;
  messageTextAlign: MessageTextAlign;
  hideLogo: boolean;
  hideOutletName: boolean;
  hideAddress: boolean;
  hideCashierName: boolean;
  hideCustomerName: boolean;
  hidePoweredBy: boolean;
  hideQr: boolean;
  hideItemDetails: boolean;
  showQrcodeTracking: boolean;
  showServiceCategory: boolean;
}

export interface City {
  id: number;
  name: string;
  type: string;
}
