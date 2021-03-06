
// function Welcome(props) {
//   return <h1>Hello, { props.name }</h1>
// }
// 和 Welcome 等效的
// class Welcome2 extends React.component {
//   render () {
//     return <h1>Hello, { this.props.name } </h1>
//   }
// }

// 整个应用


// 为每一个产品类别展示标题
class ProductCategoryRow extends React.Component {
  render () {
    const category = this.props.category
    return (
      <tr>
        <th colSpan="2">
          { category }
        </th>
      </tr>
    );
  }
}

// 每一行展示一个产品
class ProductRow extends React.component {
  render () {
    const product = this.props.product
    const name = product.stocked ?
      product.name :
      <span style={{ color: red }}>
          { product.name }
        </span>

    return (
      <tr>
        <td>{ name }</td>
        <td>{ product.price }</td>
      </tr>
    );
  }
}

// 展示数据内容并根据用户输入筛选结果
class ProductTable extends React.component {
  render () {
    const rows = []
    let lastCategory = null

    this.props.products.forEach(product => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductRow
            category={ product.category }
            key={ product.category } />
        );
      }

      rows.push(
        <ProductRow
          product={ product }
          key={ product.name } />
      )

      lastCategory = product.categroy
    });

    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{ rows }</tbody>
      </table>
    );
  }
}

// 接受所有的用户输入
class SearchBar extends React.Component {
  render () {
    return (
      <form>
        <input type="text" placeholder="...search" />
        <p>
          <input type="checkbox" />
          { ' ' }
          Only show products in stock
        </p>
      </form>
    )
  }
}

// 是整个示例应用的整体
class FilterableProductTable extends React.component {
  render () {
    return (
      <div>
        <SearchBar />
        <ProductTable products={ this.props.product } />
      </div>
    )
  }
}

// data
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={ PRODUCTS } />,
  document.getElementById('app')
)
