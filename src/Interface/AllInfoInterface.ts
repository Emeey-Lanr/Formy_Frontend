interface Option {
    answer: string;
    status: boolean;
}
export interface FormCreation {
    question: string;
    anwser: string;
    option: Option[];
}

export interface FormFillDetails {
  form_title: string;
    form_description: string
    formData:FormCreation[]
}



export interface UserProfile {
    username: string,
    email:string,
    img_url:string,
}

export interface LinkInterFace {
    userId: string,
    form_title: string,
    form_description: string,
    form_link:string,
}


interface FormData {
    anwser: string,
    question: string;
   option: { answer: string, status: boolean }[]
}

export interface CurrentData{
  
    form_link: string;
    user_email: string;
    form_details:FormData[],
    owner_id:string
}

export interface overall_analysis_data{
      
    question: string,
     ans:{picked:string, state:number, users:string[]}[]
                    
}
export interface RegisteredInfo {
    currentId:string,
    currentEmail:string,
    currentData:FormData[]
    form_title:string,
    form_link: string,
    form_description: string,
    form_registration_data: CurrentData[],
    form_overall_analysis:overall_analysis_data[]
}


export interface DashDBoardDetails {
  lastestFormResponses:CurrentData [];
  lastestForms:LinkInterFace [];
    topPerformingForm: LinkInterFace[];
      topThreeReponses:number [],
    topThreeName:string []
}

export interface TopThree {
  form_title: string;
  form_description: string;
  form_link: string;
  totalSubmit: number;
  rank: number;
}

