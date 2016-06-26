import { getJSON } from './ajax';

const wx = window.wx;

export function initShare(options) {
  getJSON('/share').then((result) => {
    wx.config(result.data);

    wx.ready(() => {
      wx.onMenuShareTimeline({
        title: options.title,
        link: options.link,
        imgUrl: options.imgUrl,
        fail(err) {
          console.log(err); /* eslint no-console: 0 */
        },
      });

      wx.onMenuShareAppMessage({
        title: options.title,
        desc: options.description,
        link: options.link,
        imgUrl: options.imgUrl,
        fail(err) {
          console.log(err); /* eslint no-console: 0 */
        },
      });

      wx.onMenuShareQQ({
        title: options.title,
        desc: options.description,
        link: options.link,
        imgUrl: options.imgUrl,
        fail(err) {
          console.log(err); /* eslint no-console: 0 */
        },
      });

      wx.onMenuShareWeibo({
        title: options.title,
        link: options.link,
        imgUrl: options.imgUrl,
        fail(err) {
          console.log(err); /* eslint no-console: 0 */
        },
      });
    });

    wx.error((reason) => {
      console.log(reason); /* eslint no-console: 0 */
    });
  });
}
