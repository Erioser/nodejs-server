const { Classify, Group, Tag } = require('../dao/Models')

const ERROR = {
  ClassifyNotExsit: { code: 404, msg: 'classify不存在' },
  ClassifyAlreadyExsit: { code: 208, msg: 'classify已存在' },
  GroupAlreadyExsitInClassify: { code: 208, msg: '该classify中已存在此group' },
  GroupNotExsitInClassify: { code: 404, msg: '该classify中不存在此group' },
  TagAlreadyExist: { code: 208, msg: 'tag已存在' },
  TagNotExist: { code: 208, msg: 'tag不存在' }
}

const service = {
  // 获取全部一级分类
  async getClassifyList (ctx, next) {
    let results = await Classify.find()
    ctx.payload = results
    return next()
  },
  // 获取一个一级分类
  async getClassifyById (ctx, next) {
    let { id } = ctx.request.query
    let results = await Classify.find({ _id: id })
    if (!results.length) {
      ctx.error = ERROR.ClassifyNotExsit
      return next()
    }
    ctx.payload = results
    return next()
  },
  // 删除一个一级分类 根据id
  async removeClassifyById (ctx, next) {
    let { id } = ctx.request.body
    let results = await Classify.find({ _id: id })
    if (!results.length) {
      ctx.error = ERROR.ClassifyNotExsit
      return next()
    }

    let classify = results[0]
    await Group.deleteMany({ _id: {$in: classify.groups.map(item => item._id)} })
    
    let result = await Classify.deleteOne({ _id: id })
    ctx.payload = result
    next()
  },
  // 创建一级分类
  async createClassify (ctx, next) {
    let { title } = ctx.request.body
    
    let results = await Classify.find({ title })
    if (results.length) {
      ctx.error = ERROR.ClassifyAlreadyExsit
      return next()
    }
    
    let classify = new Classify({ title })

    let result = await classify.save()
    ctx.payload = result
    next()
  },
  // 创建二级分类
  async createGroup (ctx, next) {
    let { classifyId, title } = ctx.request.body
    
    let results = await Classify.find({ _id: classifyId })
    if (!results.length) {
      ctx.error = ERROR.ClassifyNotExsit
      return next()
    }
    
    let classify = results[0]
    let has = classify.groups.some(item => item.title === title)
    
    // classify中已经有这个group了 
    if (has) {
      ctx.error = ERROR.GroupAlreadyExsitInClassify
      return next()
    }
    
    // 在这里存在 不同classify中同名的group
    let group = new Group({ title, classify_id: classifyId })
    let result = await group.save()
    let groups = classify.groups
    groups.push(result)
    let cr = await Classify.findOneAndUpdate({ _id: classifyId }, { 
      $set: { groups }
    }, { new: true })

    ctx.payload = result
    next()
  },
  // 删除一个二级分类
  async removeGroupFromClassify (ctx, next) {
    let { classifyId, groupId } = ctx.request.body
    let results = await Classify.find({ _id: classifyId })
    if (!results.length) {
      ctx.error = ERROR.ClassifyNotExsit
      return next()
    }

    let classify = results[0]
    let index = classify.groups.findIndex(item => {
      return item._id + '' === groupId
    })
    if (index < 0) {
      ctx.error = ERROR.GroupNotExsitInClassify
      return next()
    }

    await Group.deleteOne({ _id: classify.groups[index]._id })

    classify.groups.splice(index, 1)

    let result = await Classify.findOneAndUpdate({ _id: classifyId }, { 
      $set: { groups: classify.groups }
    }, { new: true })
    ctx.payload = result
    return next()
  },
  async createTag (ctx, next) {
    let { title } = ctx.request.body

    let tags = await Tag.find({ title })
    if (tags.length) {
      ctx.error = ERROR.TagAlreadyExist
      return next()
    }

    let tag = new Tag({ title })
    let result = await tag.save()
    ctx.payload = result
    return next()
  },
  async removeTag (ctx, next) {
    let { id } = ctx.request.body
    let tags = await Tag.find({ title })
    if (!tags.length) {
      ctx.error = ERROR.TagNotExist
      return next()
    }
    let result = await Tag.deleteOne({ _id: id })
    ctx.payload = result
    return next()
  }
}

module.exports = service