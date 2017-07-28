export default {
	// 获取非选中元素用于设置参考线
	guides: state => {
		var guides = [];
		var type = state.type;
		var index = state.index;

		['image', 'text', 'container'].forEach(val => {
			state[val].forEach((item, i) => {
				// 排除选中元素
				if (val == type && i == index) return;
				// 排除容器中的元件
				if ((val === 'image' || val === 'text') && item.belong !== 'page') return;

				guides.push({
					width: item.width,
					height: item.height,
					top: item.top,
					left: item.left
				})
			})
		})

		return guides
	},

	// 背景图片
	bgImage: state => {
		return state.bgImage.map((val, i) => {
			val.index = i;
			return val;
		})
	},

	// 图片
	image: state => {
		return state.image.map((val, i) => {
			val.index = i;
			return val;
		})
	},

	// 文本
	text: state => {
		return state.text.map((val, i) => {
			val.index = i;
			return val;
		})
	},

	// 容器名称
	containerName: state => {
		var arr = [];
		state.container.map(val => val.name && arr.push(val.name));

		return arr
	}
}