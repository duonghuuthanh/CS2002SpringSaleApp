import { Button, Table } from "react-bootstrap";
import cookie from "react-cookies";

const Cart = () => {
    const carts = cookie.load("cart") || {};

    return <>
        <h1 className="text-center text-info mt-2">GIỎ HÀNG</h1>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {Object.values(carts).map(p => {
                    return <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.price} VNĐ</td>
                                <td>{p.quantity}</td>
                                <td>
                                    <Button variant="danger">&times;</Button>
                                </td>
                            </tr>
                })}
                
                
            </tbody>
            </Table>
            <div className="mt-2 mb-2">
                <Button variant="info">Thanh toán</Button>
            </div>
    </>
}

export default Cart;