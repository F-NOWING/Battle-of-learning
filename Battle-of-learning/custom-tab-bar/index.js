Component({
	data: {
		active: 0,
		border: '2px solid #e3a51c',
		list: [
			{
				// icon: 'home-o',
				text: '示例1',
				url: '/123/index'
			},
			{
				// icon: 'search',
				text: '示例2',
				url: '/123/index1'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
			console.log(event.detail);
			
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
