export interface CreateTransactionQue {
  status?: number;
  retry?: number;
  transactionId?: string;
  transactionStatus?: string;
}

export interface updateTransactionQue {
  transactionQueId: number;
  data: {
    status: number;
    retry?: number;
  };
}
