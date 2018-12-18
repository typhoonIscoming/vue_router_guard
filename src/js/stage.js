import { dogSay, catSay } from './util'; //导出了 export 方法 
import m from './util';  //导出了 export default 

import * as testModule from './util'; //as 集合成对象导出

dogSay();

catSay();

 console.log(m);
 
testModule.dogSay();