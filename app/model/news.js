/* jshint indent: 2 */
let moment = require('moment');

module.exports = app => {

  const { INTEGER,STRING } = app.Sequelize;

  const News = app.model.define('news', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    title: {
      type: STRING,
      allowNull: false,
      defaultValue: '0',
    },
    language: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    news_abstract:{
      type: STRING,
      allowNull: false,
      defaultValue: '',
    },
    thumb:{
      type: STRING,
      allowNull: false,
      defaultValue: '',
    },
    content:{
      type: STRING,
      allowNull: false,
      defaultValue: '',
    },
    createAt:{
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
          return moment(this.getDataValue('createAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
  }, {
    tableName: 'news'
  });

  News.listNews = async function({ offset = 0, limit = 10, language = 0 }){
    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      where:{
        language:0
      }
    };

    if (language != 0){
      condition.where.language = language;
    }
    return this.findAndCountAll(condition);
  }

  News.getTopNews = async function({limit = 5, language = 1 }){
    return this.findAll({
      limit,
      where:{
        language:language
      }
    });
  }

  News.createNews = async function(news){
    return this.create(news));
  }

  News.delNewsById = async function (id) {
    const news = await this.findById(id);
    if (!news) {
      throw new Error('news not found');
    }
    return news.destroy();
  }

  News.updateNews = async function ({ id, updates }) {
    const news = await this.findById(id);
    if (!news) {
      throw new Error('news not found');
    }
    return news.update(updates);
  }

  return News;
};
