/**
 * Created by jinwei on 2018/3/9.
 */
const width = 600
const height = 600

const config = (function () {
  return {
    // 画布宽高
    width: width,
    height: height,
    canvases: ['fall', 'bg', 'firework', 'dialogue'],
    // 飘落的类型('snow', 'heart', 'mix')
    fallType: 'snow',
    /** 阶段一 */
    // 对话的参娄
    dialogueOpt: {
      // 两句话的间隔时间
      interval: 2000,
      // 语速
      speed: 100,
      d: 33
    },
    // 阶段二
    sunset: 8000,   // 天黑时间
    // 对话的文字
    dialogue: [
      { type: 6, name: '男子', txt: '金伟，快过年了，我们去放烟花吧！' },
      { type: 2, name: '女子', txt: '天还这么亮，现在放烟花也不好看。' }
    ],
    /** 阶段三 */
    // 烟花产生间隔
    fireworkInterval: [60, 240],
    fireWords: '你的眼睛|真好看|里面有|日月冬夏|晴雨山川|但是|我的眼睛|更好看|因为|里面有你',
    fireOpt: {
      wordInterval: 3000 // 每段话出现的间隔时间
    },
    /** 阶段三 */
    titleWords: '一不小心|就和你|到了白头'
  }
})()

export default config
