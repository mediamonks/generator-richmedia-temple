const data = [
  { name: '300x250 (Medium Rectangle)', value: '300x250' },
  { name: '970x250 (Billboard)', value: '970x250' },
  { name: '300x600 (Large Skyscraper)', value: '300x600' },
  { name: '728x90 (Leaderboard)', value: '728x90' },
  { name: '160x600 (Skyscraper)', value: '160x600' },
  { name: '320x240', value: '320x240' },
  { name: '336x280', value: '336x280' },
  { name: '970x90 (Super Leaderboard)', value: '970x90' },
  { name: '320x480', value: '320x480' },
  { name: '300x50', value: '300x50' },
  { name: '320x50', value: '320x50' }
];

module.exports = {
  get(name){
    if(!name){
      return data;
    }

    return data.find(item => item.value === data)[0];
  }
}
