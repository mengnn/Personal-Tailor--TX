var app=angular.module("myApp",[]);
app.controller("contactCtrl",function($scope){
	$scope.contacts=[
        {name:"马静",school:"驻马店高级中学(班主任)",img:"imgs/bb.jpg",phone:"15868855339",QQ:""},
        {name:"孟念念",school:"河南农业大学(电子信息科学与技术 信息安全)",img:"imgs/1.jpg",phone:"15868855339",QQ:"1713445471"},
        {name:"朱俊超",school:"中南大学(建筑环境与能源应用工程)",img:"imgs/2.jpg",phone:"13142088746",QQ:"971326217"},
        {name:"杜鑫",school:"武汉大学(资源与环境类)",img:"imgs/3.jpg",phone:"15527243216",QQ:"1612812431"},
        {name:"徐逞祥",school:"浙江工业大学(机械类)",img:"imgs/4.jpg",phone:"15990026145",QQ:"1056974991"},
         {name:"张新田",school:"哈尔滨工程大学(船舶与海洋工程)",img:"imgs/28.jpg",phone:"18845611289",QQ:"895281637"},
        {name:"陈建成",school:"河南科技大学(车辆工程，机械自动化)",img:"imgs/5.jpg",phone:"18848961610",QQ:"784189411"},
        {name:"周行",school:"福州大学(车辆工程)",img:"imgs/6.jpg",phone:"18649719621",QQ:"326362434"},
        {name:"王孟尧",school:"南京工业大学(自动化院测控技术和仪器)",img:"imgs/7.jpg",phone:"15720600782",QQ:"515620581"},
        {name:"杨杰",school:"广东金融学院(计算机科学与技术（金融计算机应用）)",img:"imgs/8.jpg",phone:"18819284251",QQ:"1132938618"},
        {name:"余丽萍",school:"南京邮电大学(教育技术学)",img:"imgs/9.jpg",phone:"18351926086",QQ:"1070776909"},
        {name:"石厚超",school:"河南理工大学(土木工程)",img:"imgs/10.jpg",phone:"18037022761",QQ:"1796952387"},
        {name:"刘一鸣",school:"中南财经政法大学(工商管理)",img:"imgs/11.jpg",phone:" 13971373887",QQ:"506855493"},
        {name:"高晨阳",school:"湖南工业大学(信息与计算科学)",img:"imgs/12.jpg",phone:"15673342667",QQ:"936345062"},
        {name:"王莹",school:"郑大西亚斯(会计审计)",img:"imgs/13.png",phone:"15738855758",QQ:"183250780"},
        {name:"周丽亚",school:"河南财经政法大学(应用统计专业)",img:"imgs/14.jpg",phone:"15738894886",QQ:"1272588471"},
        {name:"杨洁",school:"驻马店高级中学(待定)",img:"imgs/15.jpg",phone:"15139655405",QQ:"1668457347"},
        {name:"王蕾",school:"郑州航空工业管理学院(国际经济与贸易)",img:"imgs/16.jpg",phone:"18239677283",QQ:"1375085569"},
        {name:"胡天晓",school:"驻马店高级中学(待定)",img:"imgs/17.jpg",phone:"13783339110",QQ:"916972830"},
        {name:"朱彬",school:"南阳理工学院(电气工程及其自动化)",img:"imgs/18.png",phone:"15236075172",QQ:"570277053"},
        {name:"刘毅豪",school:"武汉理工南湖校区(材料学)",img:"imgs/19.jpg",phone:"15549446162",QQ:"921509078"},
        {name:"王莉",school:"郑州大学南校区(国际学院护理系)",img:"imgs/20.jpg",phone:"15738806898",QQ:"908562730"},
        {name:"胡若冰",school:"中原工学院信息商务学院(市场营销)",img:"imgs/21.png",phone:"15893120872",QQ:"1206959249"},
        {name:"周炯丽",school:"安阳师范(化学生物学)",img:"imgs/22.jpg",phone:"15738773525",QQ:"2411076706"},
        {name:"李娜",school:"黄河科技学院(工程造价)",img:"imgs/23.jpg",phone:"18272926173",QQ:"1226270337"},
        {name:"徐猛",school:"河南大学(化学)",img:"imgs/24.jpg",phone:"15736872925",QQ:"872516995"},
        {name:"张真真",school:"河南财经政法大学(财政税务系)",img:"imgs/25.jpg",phone:"15738399591",QQ:""},
        {name:"徐家宝",school:"河南牧业经济学院英才校区(工程管理系物业管理一班)",img:"imgs/26.jpg",phone:"",QQ:"1070349482"},
        {name:"庄园",school:"河南财经政法大学(财政税务系)",img:"imgs/27.jpg",phone:"13393981020",QQ:"372814190"},
        {name:"赖莎",school:"驻马店高级中学(待定)",img:"imgs/29.jpg",phone:"18272955672",QQ:"418467072"},
        {name:"蔡青",school:"河南科技大学(临床医学)",img:"imgs/30.jpg",phone:"18848969797",QQ:"835017339"},
        {name:"徐秀明",school:"广州大学(电子信息科技与技术)",img:"imgs/31.jpg",phone:"18819460501",QQ:"1980681652"},
        {name:"杨乐宇",school:"信阳师范学院(化学类)",img:"imgs/32.jpg",phone:"15236708929",QQ:"940807718"},
        {name:"王裔喆",school:"河南师范大学(物理学)",img:"imgs/33.png",phone:"13839942089",QQ:"1907157234"},
        {name:"崔超楠",school:"河南师范大学(法语)",img:"imgs/34.jpg",phone:"15565223707",QQ:"787535147"},
        {name:"田莉莉",school:"郑州大学西亚斯国际学院(财务管理)",img:"imgs/35.jpg",phone:"18838019857",QQ:"1973972952"},
        {name:"许宝晶",school:"河南工业大学(金融)",img:"imgs/36.jpg",phone:"15738387230",QQ:"1526782024"},
        {name:"张振",school:"鲁东大学(电气工程及其自动化)",img:"imgs/37.jpg",phone:"13290368937",QQ:"77203533"},
        {name:"姜孟卓",school:"河南工程学院(土木工程学院测绘专业)",img:"imgs/38.png",phone:"13838551012",QQ:"1759766055"},
        {name:"杨婷",school:"漯河医专(临床)",img:"imgs/39.jpg",phone:"15518219273",QQ:"814763705"},
        {name:"曾仁杰",school:"许昌学院(物联网工程 )",img:"imgs/40.jpg",phone:"18839967223",QQ:"390750977"},
        {name:"李贝",school:"河南科技大学周山校区(农学专业)",img:"imgs/41.jpg",phone:"18848966856",QQ:"2043864855"},
        {name:"齐方浩",school:"驻马店高中(待定)",img:"imgs/43.jpg",phone:"18239620268",QQ:"876239760"},
        {name:"王立",school:"驻马店高中(待定)",img:"imgs/44.jpg",phone:"15038421698",QQ:"1390962617"},
        {name:"康明馨",school:"漯河医专(临床医学)",img:"imgs/42.jpg",phone:"15518216558",QQ:"1174445904"}
	]
})
