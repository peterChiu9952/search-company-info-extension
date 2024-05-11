export default class CompanyNameParser {
    static employmentSites = [
        {
            name: "1111-job",
            urlRegex: /^https:\/\/www\.1111\.com\.tw\/job/,
            titleRegex: /(?<=｜).+?(?=｜)/,
        },
        {
            name: "1111-company",
            urlRegex: /^https:\/\/www\.1111\.com\.tw\/corp/,
            titleRegex: /.+?(?=｜)/,
        },
        {
            name: "cakeresume-job",
            urlRegex:
                /^https:\/\/www\.cakeresume\.com\/companies\/[\S]+\/jobs/,
            titleRegex: /(?<=- )(.+?)(?= Jobs)/,
        },
        {
            name: "cakeresume-company",
            urlRegex: /^https:\/\/www\.cakeresume\.com\/companies/,
            titleRegex: /[^—]+/,
        },
        {
            name: "104-job",
            urlRegex: /^https:\/\/www\.104\.com\.tw\/job/,
            titleRegex: /(?<=｜).+?(?=｜)/,
        },
        {
            name: "104-company",
            urlRegex: /^https:\/\/www\.104\.com\.tw\/company/,
            titleRegex: /.+?(?=｜)/,
        },
        {
            name: "yourator-job",
            urlRegex: /^https:\/\/www\.yourator\.co\/companies\/[\S]+\/jobs/,
            titleRegex: /(?<=- ).+?(?=｜)/,
        },
        {
            name: "yourator-company",
            urlRegex: /^https:\/\/www\.yourator\.co\/companies/,
            titleRegex: /.+?(?=－)/,
        },
        {
            name: "jobar-job",
            urlRegex: /^https:\/\/jobar\.tw\/jobs/,
            titleRegex: /[\S]+(?=｜)/,
        },
        {
            name: "jobar-company",
            urlRegex: /^https:\/\/jobar\.tw\/enterprise/,
            titleRegex: /[\S]+(?=｜)/,
        },
        {
            name: "yes123-job",
            urlRegex: /^https:\/\/www\.yes123\.com\.tw\/wk_index\/job/,
            titleRegex: /(?<=\|).+?(?=\|)/,
        },
        {
            name: "yes123-company",
            urlRegex: /^https:\/\/www\.yes123\.com\.tw\/wk_index\/comp_info/,
            titleRegex: /.+?(?=\|)/,
        },
        {
            name: "518-job",
            urlRegex: /^https:\/\/www\.518\.com\.tw\/job/,
            titleRegex: /(?<=- ).+?(?= -)/,
        },
        {
            name: "518-company",
            urlRegex: /^https:\/\/www\.518\.com\.tw\/company/,
            titleRegex: /.+?(?= -)/,
        },
        {
            name: "chickpt-job",
            urlRegex: /^https:\/\/www\.chickpt\.com\.tw\/job/,
            titleRegex: /(?<=- ).+?(?= -)/,
        },
        {
            name: "chickpt-company",
            urlRegex: /^https:\/\/www\.chickpt\.com\.tw\/company/,
            titleRegex: /.+?(?=－)/,
        },
        {
            name: "meet.jobs-job",
            urlRegex: /^https:\/\/meet\.jobs\/[\S]+\/jobs/,
            titleRegex: /(?<=- ).+?(?=｜)/,
        },
        {
            name: "meet.jobs-company",
            urlRegex: /^https:\/\/meet\.jobs\/[\S]+\/employers/,
            titleRegex: /.+?(?=｜)/,
        },
    ];

    static getCompanyNameFromTitle = (url: string, title: string) => {
        const titleRegex = this.getTitleRegex(url);

        if (titleRegex) {
            const companyName = titleRegex.exec(title);
            if (companyName) {
                return companyName[0];
            }
        }

        return "";
    };

    static getTitleRegex = (url: string) => {
        for (let i = 0; i < this.employmentSites.length; i++) {
            var site = this.employmentSites[i];
            if (site.urlRegex.test(url)) {
                return site.titleRegex;
            }
        }

        return undefined;
    };
}
