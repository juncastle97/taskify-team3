export interface ColumnDataType {
  result: string;
  data: [
    {
      id: number;
      title: DataType[];
      teamId: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
}
export interface DataType {
  title: string;
}
