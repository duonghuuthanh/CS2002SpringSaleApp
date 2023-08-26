
import { Button, Table } from "react-bootstrap";
import cookie from "react-cookies";
import MySpinner from "../layout/MySpinner";

const Cart = () => {
    const carts = cookie.load("cart") || null;

    if (carts === null)
        return <MySpinner />

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
            {Object.values(carts).map(c => {
                return <tr>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>{c.unitPrice}</td>
                        <td>{c.quantity}</td>
                        <td>
                            <Button variant="danger">&times;</Button>
                        </td>
                    </tr>
            })}
            
           
        </tbody>
        </Table>
    </>
}

export default Cart;