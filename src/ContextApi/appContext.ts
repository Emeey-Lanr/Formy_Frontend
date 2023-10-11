

export const appContextDetails = {
  userAuthorisation: () => {},
  loadLinkError: false,
  setLoadLinkError: (loadLinkError: boolean) => {},
  loadLinkMessage: "",
  setLoadLinkMessage: (loadLinkMessage: string) => {},
  submitForm: false,
  setSubmitForm: (submitForm: boolean) => {},
  ownerId: "",
  setOwnerId: (ownerId: string) => {},
  getLinkF: () => {},
  getDetails: (id: string) => {},
  infoModalState: false,
  setInfoModalState: (infoModalState: boolean) => {},
  overallAnalysisState: false,
  setOverallAnalysisState: (overallAnalysisState: boolean) => {},
  links: [],
  ifEmpty:"",
  setIfEmpty:(prev:string)=>{},
};