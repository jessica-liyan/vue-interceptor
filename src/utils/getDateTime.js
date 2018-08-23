import moment from 'moment'
moment.locale('zh_cn')

let now = new Date()
export default function getDateTime(dataStr) {
  let date = new Date(dataStr)
  let d = now - date
  let minute = parseInt(parseInt(d)/1000/60)
  
  if(isToday (date)) { // 今天
    if (minute < 60) { // 1小时之内
      if (minute <= 1) {//一分钟之内，显示刚刚
          return "刚刚";
      } else {
          return minute + "分钟前";
      }
    }else {
      return moment(dataStr).format('HH:mm')
    }
  }
  if(isYestoday(date)){ // 昨天
    return "昨天 " + moment(dataStr).format('HH:mm')
  }
  if(isThisWeek(date)){ // 本周
    let weekday;
    if (date.getDay() == 1) {
      weekday = "周一";
    }
    if (date.getDay() == 2) {
        weekday = "周二";
    }
    if (date.getDay() == 3) {
        weekday = "周三";
    }
    if (date.getDay() == 4) {
        weekday = "周四";
    }
    if (date.getDay() == 5) {
        weekday = "周五";
    }
    if (date.getDay() == 6) {
        weekday = "周六";
    }
    if (date.getDay() == 0) {
        weekday = "周日";
    }
    return weekday + " " + moment(dataStr).format('HH:mm')
  }
  if(isThisYear(date)){ // 本年
    return moment(dataStr).format('MM-DD HH:mm')
  }
  return moment(dataStr).format('YYYY-MM-DD HH:mm')
}

function isToday (date) {
  return (date.getYear() == now.getYear()) && (date.getMonth() == now.getMonth()) && (date.getDate() == now.getDate())
}
function isYestoday (date) {
  return (date.getYear() == now.getYear()) && (date.getMonth() == now.getMonth()) && (date.getDate() + 1 == now.getDate())
}
function isThisWeek(date) {
  if ((date.getYear() == now.getYear()) && (date.getMonth() == now.getMonth())) {
    if (now.getDay() - date.getDay() < now.getDay() && now.getDate() - date.getDate() > 0 && now.getDate() - date.getDate() < 7) {
      return true;
    }
  }
  return false;
}
function isThisYear (date) {
  return date.getYear() == now.getYear()
}