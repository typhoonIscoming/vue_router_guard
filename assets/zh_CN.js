export default {
	min: (field, [length]) => `${field}必须至少有 ${length} 字符`,
	max: (field, [length]) => `${field}不能大于${length}字符`,
	required: (field) => `${field}是必须的`,
	mobile:(field)=>`${field}格式错误了`,
	email:(field)=>`${field}格式不正确`
}
