<%-- 
    Document   : index
    Created on : Jul 8, 2023, 3:08:58 PM
    Author     : admin
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<c:url value="/" var="action" />
<section class="container">
    <h1 class="text-center text-success mt-1">DANH SÁCH SẢN PHẨM</h1>
    <a href="<c:url value="/products" />" class="btn btn-info mt-1">Thêm sản phẩm</a>

    <c:if test="${pages > 1}">
        <ul class="pagination mt-1">
            <li class="page-item"><a class="page-link" href="${action}">Tất cả</a></li>
                <c:forEach begin="1" end="${pages}" var="i">
                    <c:url value="/" var="pageUrl">
                        <c:param name="page" value="${i}" /> 
                    </c:url>
                <li class="page-item"><a class="page-link" href="${pageUrl}">${i}</a></li>
                </c:forEach>
<!--            <li class="page-item">
                <form action="${action}" id="pageNumber">
                    <input type="number" min="1" max="${pages}" name="page" onchange="document.getElementById('pageNumber').submit()" />
                </form>
            </li>-->
        </ul>

    </c:if>

    <table class="table table-hover">
        <thead>
            <tr>
                <th></th>
                <th>Id</th>
                <th>Tên sản phẩm</th>
                <th>Gía</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${products}" var="p">
                <tr>
                    <td>
                        <img src="${p.image}" alt="${p.name}" width="120" />
                    </td>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>${p.price} VNĐ</td>
                    <td>
                        <c:url value="/products/${p.id}" var="api" />
                        <a href="${api}" class="btn btn-info">Cập nhật</a>
                        <button class="btn btn-danger" onclick="deleleProduct('${api}')">Xóa</button>
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</section>
    <script src="<c:url value="/js/main.js" />"></script>