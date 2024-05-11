import { CompanyInfoSite } from "../interface/CompanyInfoSite";
import { v4 as uuidv4 } from 'uuid';

export const companyInfoSites: CompanyInfoSite[] = [
    {
        id: uuidv4(),
        name: "Google",
        url: "https://google.com/search?q={}",
    },
    {
        id: uuidv4(),
        name: "GoodJob職場透明化運動",
        url: "https://www.goodjob.life/search?q={}",
    },
    {
        id: uuidv4(),
        name: "面試趣",
        url: "https://interview.tw/search#gsc.tab=0&gsc.q={}&gsc.sort=&gsc.page=1",
    },
    {
        id: uuidv4(),
        name: "比薪水",
        url: "https://salary.tw/search#gsc.tab=0&gsc.q={}&gsc.sort=",
    },
    {
        id: uuidv4(),
        name: "qollie求職天眼通",
        url: "https://www.qollie.com/search?keyword={}&kind=company&from=normal",
    },
    {
        id: uuidv4(),
        name: "Dcard",
        url: "https://www.dcard.tw/search?query={}",
    },
];