
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

// Opening script: Introduction of the Host
export const OPENING_SCRIPT = "尊敬的各位领导、各位同事，大家晚上好！我是本次盛典的AI主持人——小信。欢迎来到2025金发科技信息管理部年度颁奖盛典！今晚，数据与荣耀共舞，我们将共同见证那些在代码与业务中闪闪发光的伙伴。请调整好呼吸，准备迎接属于我们的高光时刻，盛典正式开始！";

export const AWARDS: Award[] = [
  {
    id: 'excellent_newcomer',
    title: '优秀新人奖',
    description: '初入职场便展露锋芒，以饱满的热情和惊人的成长速度，为团队注入了新鲜血液。',
    icon: 'fa-seedling',
    winners: [
      { name: '林晓微', department: '前端开发组', avatar: 'https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6' },
      { name: '张子轩', department: '数据运营组', avatar: 'https://github.com/jannifer007/2025-kingfa3/blob/6e3f2f1a834fca5cd6f39ab881bc81edd42303f7/public/%E5%AE%9A%E4%BD%8D.png?raw=true'}
    ],
    scripts: {
      preReveal: "首先要揭晓的是【优秀新人奖】。他们初出茅庐，却敢于挑战；他们是金发科技未来的希望。让我们看看是哪两位新星脱颖而出？",
      reveal: "恭喜林晓微、张子轩！初入职场，你们用行动证明了潜力，用学习诠释了成长。代码是你们的语言，创新是你们的翅膀。未来的舞台属于你们，继续发光吧！",
      postReveal: "长江后浪推前浪，真是后生可畏啊！让我们再次把掌声送给他们。接下来，奖项的分量将越来越重哦。"
    }
  },
  {
    id: 'excellent_individual',
    title: '优秀个人奖',
    description: '在平凡的岗位上创造不平凡的业绩，用专业和责任心诠释了金发精神。',
    icon: 'fa-user-tie',
    winners: [
      { name: '王志强', department: '系统架构部', avatar: 'https://picsum.photos/seed/i1/100/100' },
      { name: '陈静', department: '项目管理部', avatar: 'https://picsum.photos/seed/i2/100/100' },
      { name: '李伟', department: '信息安全部', avatar: 'https://picsum.photos/seed/i3/100/100' }
    ],
    scripts: {
      preReveal: "接下来颁发的是【优秀个人奖】。他们是部门的中流砥柱，在各自的岗位上兢兢业业，用实力说话。",
      reveal: "恭喜王志强、陈静、李伟！你们在过去的一年里，面对难题迎难而上，用卓越的执行力交付了完美的答卷。你们是团队的定海神针，致敬每一份坚守！",
      postReveal: "每一份荣誉背后都是无数个日夜的奋斗。感谢你们的付出！"
    }
  },
  {
    id: 'service_star',
    title: '服务之星',
    description: '以用户为中心，响应迅速，服务周到，是大家心中最温暖的技术支持。',
    icon: 'fa-headset',
    winners: [
      { name: '赵敏', department: 'IT服务台', avatar: 'https://picsum.photos/seed/s1/100/100' },
      { name: '刘洋', department: '桌面运维组', avatar: 'https://picsum.photos/seed/s2/100/100' }
    ],
    scripts: {
      preReveal: "技术不仅要有高度，更要有温度。下面颁发的是【服务之星】。是谁在每一次呼唤中及时响应，解决了大家的燃眉之急呢？",
      reveal: "恭喜赵敏、刘洋！你们用耐心和专业，赢得了业务部门的一致好评。微笑是你们的名片，满意是你们的追求。你们是信息管理部最温暖的守护者！",
      postReveal: "服务无止境，满意无终点。为我们最可爱的服务之星点赞！"
    }
  },
  {
    id: 'tech_innovation',
    title: '技术攻坚奖',
    description: '勇于探索新技术，攻克核心难题，推动部门技术栈的升级与换代。',
    icon: 'fa-microchip',
    winners: [
      { name: '周杰', department: '云原生实验室', avatar: 'https://picsum.photos/seed/t1/100/100' },
      { name: '吴昊', department: '大数据平台', avatar: 'https://picsum.photos/seed/t2/100/100' }
    ],
    scripts: {
      preReveal: "创新是发展的原动力。接下来是【技术攻坚奖】。他们敢啃硬骨头，在代码的世界里开疆拓土。",
      reveal: "众望所归，恭喜周杰、吴昊！在核心技术重构中，你们展现了极客精神，实现了关键性能的十倍提升。你们用技术定义未来，硬核担当，实至名归！",
      postReveal: "技术改变世界，创新引领未来。希望大家在技术道路上越走越远！"
    }
  },
  {
    id: 'excellent_team',
    title: '优秀团队奖',
    description: '团结协作，高效执行，在重大项目中展现了强大的战斗力和凝聚力。',
    icon: 'fa-users',
    winners: [
      { name: 'ERP重构项目组', department: '业务系统部', avatar: 'https://picsum.photos/seed/team1/100/100' },
      { name: '信息安全护卫队', department: '安全部', avatar: 'https://picsum.photos/seed/team2/100/100' }
    ],
    scripts: {
      preReveal: "独行快，众行远。现在要揭晓的是分量极重的【优秀团队奖】。哪支队伍在过去一年里战功赫赫？",
      reveal: "热烈祝贺ERP重构项目组、信息安全护卫队！你们心往一处想，劲往一处使，打赢了一场又一场攻坚战。聚是一团火，散是满天星，你们是金发最强的铁军！",
      postReveal: "团队的力量是无穷的。让我们向这些优秀的团队学习，以此为榜样！"
    }
  },
  {
    id: 'special_contribution',
    title: '特殊贡献奖',
    description: '在关键时刻挺身而出，为公司数字化转型做出了不可磨灭的贡献。',
    icon: 'fa-medal',
    winners: [
      { name: '孙红梅', department: '数字化总办', avatar: 'https://picsum.photos/seed/sp1/100/100' },
      { name: '郑开', department: '智能制造组', avatar: 'https://picsum.photos/seed/sp2/100/100' }
    ],
    scripts: {
      preReveal: "最后，我们要颁发的是压轴大奖——【特殊贡献奖】。他们在关键时刻力挽狂澜，引领了变革的方向。",
      reveal: "全场致敬！恭喜孙红梅、郑开！你们以非凡的远见和魄力，推动了数字化转型的落地。你们不仅是技术的引领者，更是变革的先驱。致敬，领路人！",
      postReveal: "2025因为有你们而精彩，2026我们继续携手同行，共创辉煌！颁奖典礼圆满礼成！"
    }
  }
];
