export interface ProjectReportModel {
  startDate: Date;
  endDate: Date;
}
export interface MembersByProjectReportModel extends ProjectReportModel {
  projectId: string;
}
