function scheduleHtmlParser(html) {
    let result = [];
    let lessons = $('#lessons tbody').children();
    let numTable = {
        一:1, 二:2, 三:3, 四:4, 五:5, 六:6, 七:7, 八:8, 九:9, 十:10, 
        十一:11, 十二:12, 十三:13, 十四:14, 十五:15, 十六:16, 十七:17, 
        十八:18, 十九:19, 二十:20, 二十一:21
    };
    let pattern = /(\d+)~(\d+)周 周(.*?) 第(.*?)节~第(.*?)节 .*? (.*?)$/;

    for (let u = 0; u < lessons.length; u++) {
        
        let lesson = $(lessons[u]).children();
        let info = $(lesson).eq(8).text().split('; '); // 日期时间地点人员
        if (info == "") {
            continue;
        }

        let name =  $(lesson).eq(2).text();
        let teacher = $(lesson).eq(7).text();


        // 日期时间地点信息去重（多个老师会有多条一样的文本）

        let trimedInfo = new Set();
        
        for (let i = 0; i < info.length; i++) {
            trimedInfo.add(info[i].substring(0, info[i].lastIndexOf(" ")));
        }
        

        for (let ti of trimedInfo) {
            let re = { sections: [], weeks: [] };
            re.name = name;
            re.teacher = teacher;
            let matched = pattern.exec(ti);
            re.position = matched[6];
            re.day = numTable[matched[3]];
            for (let j = parseInt(matched[1]); j <= parseInt(matched[2]); j++) {
                re.weeks.push(j);
            }
            for (let s = numTable[matched[4]]; s <= numTable[matched[5]]; s++) {
                re.sections.push({section: s});
            }
            result.push(re);
        }   
    }
    console.log(result);

    let sectionTimes = [
        {
            "section": 1, 
            "startTime": "08:00",
            "endTime": "08:50"
        },
        {
            "section": 2, 
            "startTime": "09:00",
            "endTime": "09:50"
        },
        {
            "section": 3, 
            "startTime": "10:10",
            "endTime": "11:00"
        },
        {
            "section": 4, 
            "startTime": "11:10",
            "endTime": "12:00"
        },
        {
            "section": 5, 
            "startTime": "14:00",
            "endTime": "14:50"
        },
        {
            "section": 6, 
            "startTime": "15:00",
            "endTime": "15:50"
        },
        {
            "section": 7, 
            "startTime": "16:00",
            "endTime": "16:50"
        },
        {
            "section": 8, 
            "startTime": "17:00",
            "endTime": "17:50"
        },
        {
            "section": 9, 
            "startTime": "19:00",
            "endTime": "19:50"
        },
        {
            "section": 10, 
            "startTime": "20:00",
            "endTime": "20:50"
        },
        {
            "section": 11, 
            "startTime": "21:00",
            "endTime": "21:50"
        },
    ];

    return { courseInfos: result, sectionTimes: sectionTimes };
}