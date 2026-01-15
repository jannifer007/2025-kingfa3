
import { Award } from './types';

export const ROBOT_IDLE_PHRASES = [
  "小信正在巡逻中...",
  "检测到现场气氛热烈！",
  "下一个幸运儿是谁呢？",
  "新年快乐，万事如意！",
  "2026 越来越好！",
  "这也太激动人心了吧！",
  "数据连接正常，准备开奖！",
  "为金发人点赞！",
  "小信时刻准备着！"
];

// Music Configuration
export const MUSIC_PATHS = {
  MAIN_BGM: 'music/main_bgm.mp3',     // Global background music (Loop)
};

// Opening script: Introduction of the Host
export const OPENING_SCRIPT = `尊敬的各位领导、各位同事，大家晚上好！我是本次盛典的AI主持人——小信。欢迎来到二零二五金发科技信息管理部年度颁奖盛典！今晚，星光璀璨，我们将共同见证那些在过去一年里表现卓越的个人与团队。请大家调整呼吸，准备迎接属于我们的荣耀时刻！`;

export const AWARDS: Award[] = [
  {
    id: 'excellent_specialist',
    title: '优秀专员',
    description: '他们在各自的专业领域深耕细作，保障了部门各项职能的高效运转。',
    citation: '你的专业是团队的基石，你的严谨是流程的保障。在平凡的岗位上，你用不平凡的坚持，诠释了专员的价值与担当，是部门高效运转最坚实的后盾。',
    icon: 'fa-user-tag',
    winners: [
      { name: '吴煜春', department: '培训专员', avatar: '/public/images/chenle.png' },
      { name: '资城元', department: '行政专员', avatar: '/images/zcy.png' },
      { name: '张茜', department: '项目专员', avatar: 'images/张茜.jpg' },
      { name: '袁健', department: ' 保密专员', avatar: 'images/袁健.jpg' },
      { name: '龙月桂', department: '绩效专员', avatar: 'images/龙月桂.jpg' },
      { name: '谢雨桦', department: '文档专员', avatar: 'images/谢雨桦.jpg' },
      { name: '刘海滨', department: '预算专员', avatar: 'images/刘海滨.jpg' },
      { name: '容文康', department: '标准专员', avatar: 'images/容文康.jpg' },
      { name: '周盛佳', department: '架构专员', avatar: 'images/周盛佳.jpg' },
      { name: '何柳琴', department: '固定资产专员', avatar: 'images/何柳琴.jpg' }
    ],
    scripts: {
      preReveal: `盛典第一项，我们将颁发【优秀专员】奖。他们在各自的职能领域里深耕细作，是部门高效运转的坚实保障。`,
      reveal: `他们分别是：吴煜春、资城元、张茜、袁健、龙月桂、谢雨桦、刘海滨、容文康、周盛佳、何柳琴。你们专业严谨，服务周到，是团队最可靠的后盾。让我们掌声有请顾部上台为他们颁奖！`,
      postReveal: `感谢这十位伙伴的默默付出，你们是团队不可或缺的力量！`
    }
  },
  {
    id: 'best_newcomer',
    title: '部门最佳新人奖',
    description: '初入职场便展现出非凡的潜力和活力。',
    citation: '初生牛犊不怕虎，鲜衣怒马少年时。你以蓬勃的朝气注入团队，用快速的成长证明潜力。虽是新人，却展现出不凡的实力，未来星辰大海，任你翱翔。',
    icon: 'fa-seedling',
    winners: [
      { name: '阮睿达', department: 'AI应用组', avatar: 'images/阮睿达.jpg' },
      { name: '常靖楠', department: '生产制造组', avatar: 'images/常靖楠.jpg' }
    ],
    scripts: {
      preReveal: `长江后浪推前浪，接下来颁发的是【部门最佳新人奖】。他们初出茅庐却锋芒毕露，为团队注入了新鲜血液。`,
      reveal: `他们分别是：AI应用组的阮睿达、生产制造组的常靖楠。虽是新人，但实力不凡，未来可期！有请霞姐上台为他们颁奖！`,
      postReveal: `期待你们在金发的舞台上继续乘风破浪，绽放更多光彩！`
    }
  },
  {
    id: 'best_progress',
    title: '部门最佳进步奖',
    description: '这一年，他们的成长速度惊人，从跟随者变成了领跑者。',
    citation: '蜕变是痛苦的，但化茧成蝶是美丽的。你从跟跑到领跑，用汗水浇灌成长，用实力刷新高度。今天的进步，是明天卓越的基石，你是奋斗者最好的注脚。',
    icon: 'fa-chart-line',
    winners: [
      { name: '符桂玲', department: '数据中心组', avatar: 'images/符桂玲.jpg' },
      { name: '杨镇醴', department: '信息安全组', avatar: 'images/杨镇醴.jpg' },
      { name: '吴煜春', department: 'Java开发组', avatar: 'images/吴煜春.jpg' }
    ],
    scripts: {
      preReveal: `成长是职场最美的风景，下面揭晓【部门最佳进步奖】。`,
      reveal: `他们分别是：符桂玲、杨镇醴、吴煜春。这一年，你们用汗水浇灌成长，用超越证明自我，实现了从追随者到领跑者的蜕变。有请维维哥上台为他们颁奖！`,
      postReveal: `每天进步一点点，坚持带来大改变。为你们的蜕变点赞！`
    }
  },
  {
    id: 'outstanding_contribution',
    title: '部门突出贡献奖',
    description: '为部门发展做出了卓越贡献，关键时刻顶得上。',
    citation: '沧海横流方显英雄本色。关键时刻，你挺身而出；重任在肩，你义无反顾。你用行动诠释了担当，用业绩书写了忠诚，为部门发展立下了汗马功劳。',
    icon: 'fa-trophy',
    winners: [
      { name: '何柳琴', department: '服务管理组', avatar: 'images/何柳琴.jpg' }
    ],
    scripts: {
      preReveal: `接下来这个奖项分量十足，【部门突出贡献奖】属于那些关键时刻顶得上的英雄。`,
      reveal: `获奖者是：服务管理组的何柳琴。你在工作中展现出的非凡担当与卓越贡献，大家有目共睹，你是我们的榜样！掌声有请顾部上台为你颁奖！`,
      postReveal: `致敬每一份极致的付出，感谢你为部门带来的荣耀！`
    }
  },
  {
    id: 'dev_pioneer',
    title: '开发先锋奖',
    description: '代码是他们的武器，创新是他们的信条。',
    citation: '代码是你的语言，键盘是你的武器。在0与1的数字世界里，你构建起坚固的系统堡垒。你用精湛的技术攻克难题，用持续的创新驱动业务前行。',
    icon: 'fa-code',
    winners: [
      { name: '余泓希', department: 'ABAP开发组', avatar: 'images/余泓希.jpg' },
      { name: '周震宇', department: 'ABAP开发组', avatar: 'images/周震宇.jpg' }
    ],
    scripts: {
      preReveal: `代码构建世界，创新引领未来。下面颁发【开发先锋奖】。`,
      reveal: `他们分别是：ABAP开发组的余泓希、周震宇。你们用一行行代码筑起系统的基石，技术精湛，攻坚克难。有请维维哥上台为他们颁奖！`,
      postReveal: `技术无止境，愿你们继续在开发的道路上披荆斩棘！`
    }
  },
  {
    id: 'impl_pioneer',
    title: '实施先锋奖',
    description: '深入一线，连接业务与技术，是项目落地的关键力量。',
    citation: '你是连接技术与业务的桥梁，是项目落地的攻坚力量。深入一线，倾听需求，服务用户，你用专业的实施能力和极佳的服务意识，让系统价值完美绽放。',
    icon: 'fa-tools',
    winners: [
      { name: '邓祥', department: '信息门户实施组', avatar: 'images/邓祥.jpg' },
      { name: '蔡梦清', department: '财务实施组', avatar: 'images/蔡梦清.jpg' },
      { name: '陈华章', department: '研发质量组', avatar: 'images/陈华章.jpg' }
    ],
    scripts: {
      preReveal: `他们深入一线，让系统真正产生价值。接下来颁发【实施先锋奖】。`,
      reveal: `他们分别是：邓祥、蔡梦清、陈华章。你们是业务最信赖的伙伴，是项目落地的关键力量。有请霞姐上台为他们颁奖！`,
      postReveal: `实施不仅是技术，更是服务与沟通。感谢你们的辛勤付出！`
    }
  },
  {
    id: 'data_ai_pioneer',
    title: '数据与智能先锋',
    description: '探索数据价值，引领智能未来。',
    citation: '探索数据的奥秘，点亮智能的未来。你敢于尝试，勇于创新，将前沿技术转化为生产力。在数字化转型的浪潮中，你是最勇敢的弄潮儿。',
    icon: 'fa-brain',
    winners: [
      { name: '陈乐', department: 'AI应用组', avatar: 'images/陈乐.jpg' },
      { name: '欧阳梓贤', department: 'BI应用组', avatar: 'images/欧阳梓贤.jpg' }
    ],
    scripts: {
      preReveal: `数据驱动决策，智能点亮未来。下面揭晓【数据与智能先锋】。`,
      reveal: `他们分别是：陈乐、欧阳梓贤。你们在大数据与AI领域的大胆探索，为公司数字化转型注入了强劲动力。有请徐哥上台为他们颁奖！`,
      postReveal: `智慧光芒，照亮未来。期待更多智能场景的落地！`
    }
  },
  {
    id: 'infra_pioneer',
    title: '基础设施先锋',
    description: '默默守护网络与数据中心，保障信息高速公路畅通无阻。',
    citation: '默默无闻，却是中流砥柱。你日夜守护着网络的畅通，保障着数据的安全。在看不见的战线上，你是信息高速公路最可靠的守护者。',
    icon: 'fa-server',
    winners: [
      { name: '林世乐', department: '网络组', avatar: 'images/林世乐.jpg' },
      { name: '王耀斌', department: '数据中心组', avatar: 'images/王耀斌.jpg' },
      { name: '苏洋', department: '服务管理组', avatar: 'images/苏洋.jpg' }
    ],
    scripts: {
      preReveal: `他们是幕后的英雄，守护着数字世界的基石。接下来颁发【基础设施先锋】奖。`,
      reveal: `他们分别是：林世乐、王耀斌、苏洋。正是有了你们日以继夜的守护，我们的网络与数据才如此安全畅通。有请盛佳哥上台为他们颁奖！`,
      postReveal: `稳如泰山，坚如磐石。向基础设施的守护者致敬！`
    }
  },
  {
    id: 'base_service_star',
    title: '基地服务之星',
    description: '扎根属地，服务一线，用行动诠释责任。',
    citation: '扎根属地，心系一线。距离从未阻隔你的热情，服务始终在线。你用实际行动，诠释了“客户至上”的服务理念，是基地同事最信赖的伙伴。',
    icon: 'fa-star',
    winners: [
      { name: '梁金东', department: '属地组', avatar: 'images/梁金东.jpg' }
    ],
    scripts: {
      preReveal: `我们的服务触角延伸至每一个角落，下面颁发【基地服务之星】。`,
      reveal: `获奖者是：属地组的梁金东。你扎根一线，心系业务，是基地同事最坚实的技术依靠。有请徐哥上台为你颁奖！`,
      postReveal: `距离虽远，心却很近。感谢你在基地的坚守与付出！`
    }
  },
  {
    id: 'excellent_pm',
    title: '优秀项目经理',
    description: '运筹帷幄，决胜千里，带领团队攻克一个又一个项目堡垒。',
    citation: '运筹帷幄之中，决胜千里之外。你统筹全局，协调各方，带领团队攻坚克难。在复杂的项目中，你是指挥若定的船长，引领团队抵达成功的彼岸。',
    icon: 'fa-tasks',
    winners: [
      { name: '龙月桂', department: '销售贸易实施组', avatar: 'images/龙月桂.jpg' },
      { name: '章浩鑫', department: '网络组', avatar: 'images/章浩鑫.jpg' }
    ],
    scripts: {
      preReveal: `运筹帷幄，决胜千里。接下来要揭晓的是【优秀项目经理】。`,
      reveal: `他们分别是：龙月桂、章浩鑫。你们统筹全局，高效协同，带领团队攻克了一个又一个难关。有请盛佳哥上台为他们颁奖！`,
      postReveal: `优秀的项目经理是团队的灵魂。为你们卓越的领导力点赞！`
    }
  },
  {
    id: 'dept_excellent_employee',
    title: '部门优秀员工',
    description: '综合素质过硬，业绩表现突出，是大家的楷模。',
    citation: '你的优秀是一种习惯，你的业绩是一面旗帜。综合素质过硬，工作表现卓越，你在团队中散发着光与热，是大家公认的楷模与标杆。',
    icon: 'fa-user-check',
    winners: [
      { name: '李晓东', department: '供应链实施组', avatar: 'images/李晓东.jpg' }
    ],
    scripts: {
      preReveal: `综合素质过硬，业绩表现卓越，下面颁发【部门优秀员工】大奖。`,
      reveal: `获奖者是：供应链实施组的李晓东。你用敬业诠释责任，用业绩证明实力，是大家公认的楷模。掌声有请顾部上台为你颁奖！`,
      postReveal: `榜样的力量是无穷的。让我们向李晓东学习！`
    }
  },
  {
    id: 'team_leader_progress',
    title: '组长进步奖',
    description: '带领团队不断突破，管理能力与技术实力同步提升。',
    citation: '领头羊的视野决定团队的方向。你不断突破自我，提升管理艺术，带领团队在变革中前行，在挑战中成长，实现了个人与团队的双重飞跃。',
    icon: 'fa-chess-knight',
    winners: [
      { name: '魏阳', department: 'Java开发组', avatar: 'images/魏阳.jpg' }
    ],
    scripts: {
      preReveal: `火车跑得快，全靠车头带。接下来颁发【组长进步奖】。`,
      reveal: `获奖者是：Java开发组的魏阳。在带领团队攻坚克难的过程中，你的管理艺术与技术视野都迈上了新台阶。有请维维哥上台为你颁奖！`,
      postReveal: `卓越的领导力是团队前行的引擎。祝贺魏阳组长！`
    }
  },
  {
    id: 'excellent_kpi_team',
    title: '优秀KPI团队',
    description: 'BI应用组团结协作，超额完成各项KPI指标，是当之无愧的冠军团队。',
    citation: '聚沙成塔，众志成城。你们目标一致，协作无间，用汗水浇灌荣誉。超额完成各项KPI指标，用完美的数据交付了满分答卷，你们是当之无愧的冠军团队！',
    icon: 'fa-crown',
    winners: [
      { name: '何世炎', department: 'BI应用组', avatar: 'images/何世炎.jpg' },
      { name: '黄彬翔', department: 'BI应用组', avatar: 'images/黄彬翔.jpg' },
      { name: '蒋莲东', department: 'BI应用组', avatar: 'images/蒋莲东.jpg' },
      { name: '罗盛源', department: 'BI应用组', avatar: 'images/罗盛源.jpg' },
      { name: '欧阳梓贤', department: 'BI应用组', avatar: 'images/欧阳梓贤.jpg' },
      { name: '谭润峰', department: 'BI应用组', avatar: 'images/谭润峰.jpg' },
      { name: '徐强', department: 'BI应用组', avatar: 'images/徐强.jpg' },
      { name: '赵婕', department: 'BI应用组', avatar: 'images/赵婕.jpg' },
      { name: '赵星宇', department: 'BI应用组', avatar: 'images/赵星宇.jpg' },
      { name: '左华丽', department: 'BI应用组', avatar: 'images/左华丽.jpg' }
    ],
    scripts: {
      preReveal: `最后，我们要揭晓今晚的压轴大奖——【优秀KPI团队】。数据说明一切，实力铸就荣耀！`,
      reveal: `获奖团队是：逼哎应用组！他们分别是：何世炎、黄彬翔、蒋莲东、罗盛源、欧阳梓贤、谭润峰、徐强、赵婕、赵星宇、左华丽。你们团结协作，使命必达，用完美的数据交出了满分答卷。让我们以最热烈的掌声，有请顾部上台为冠军团队颁奖！`,
      postReveal: `聚是一团火，散是满天星。祝贺逼哎应用组，你们是全场的焦点！`
    }
  }
];
