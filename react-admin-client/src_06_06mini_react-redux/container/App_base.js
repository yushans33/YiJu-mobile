import { connect } from '../lib/react-redux'
import Counter from '../components/counter'
import { increment, decrement } from '../redux/actions'
/*
容器组件: 通过connect包装UI组件产生组件
connect(): 高阶函数
connect()返回的函数是一个高阶组件: 接收一个UI组件, 生成一个容器组件
容器组件的责任: 向UI组件传入特定的属性
 */


/*
用来将redux管理的state数据映射成UI组件的一般属性的函数
 */
function mapStateToprops(state) {
    return { count: state.count }
}

/*
用来将包含diaptch代码的函数映射成UI组件的函数属性的函数
 */
// function mapDispatchToProps(dispatch) {
//     return {
//         increment: (number) => dispatch(increment(number)),
//         decrement: (number) => dispatch(decrement(number))
//     }
// }

const mapDispatchToProps = { increment, decrement }

export default connect(
    mapStateToprops,//指定一般属性
    mapDispatchToProps//指定函数属性
)(Counter)