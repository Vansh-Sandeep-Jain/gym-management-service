export interface ISlot {
  coachId: string;
  capacity: number;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  state: string;
  createdAt?: Date;
  updatedAt?: Date;
}
