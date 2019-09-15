import {action,observable} from 'mobx'
class Global{
    @observable  public locale:string
      // 按条件获取试题
      @action public changeLocale(locale: string): void{
        console.log('this...', this, locale);
        this.locale = locale;
    }
}
export default Global