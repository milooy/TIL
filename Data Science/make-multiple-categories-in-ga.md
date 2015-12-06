# GA로 다중 카테고리 넣기

category는 array말고 string만 지원되어서
태그처럼 다대다로 속하는 카테고리는 어떻게 넣을까 찾아보다 발견한 꼼수

```python
{% block ga_ecommerce %}
    <script>
        ga('require', 'ecommerce', 'ecommerce.js');
        ga('ecommerce:addTransaction', {
            'id': '{{ object.id }}', // 시스템에서 생성된 주문번호. 필수.
            'revenue': '{{ object.total_price }}', // 구매총액. 필수. 배송비 및 세금 기타 모든 비용 포함
            'shipping': '{{ object.delivery_charge }}', // 배송비. 선택사항.
        });
    </script>
    {% for item in object.orderedproduct_set.all %}
        <script>
            ga('ecommerce:addItem', {
                'id': '{{ object.id }}', //시스템에서 생성된 주문번호. 필수.
                'name': '{{ item.product.name }}', // 제품명. 필수.
                'category': '{{ item.product.get_categories_ga }}', // 제품 분류.
                'price': '{{ item.sales_price }}', // 제품 단가.
                'quantity': '{{ item.quantity|safe }}' // 제품 수량.
            });
        </script>
    {% endfor %}
    <script>
        ga('ecommerce:send');
    </script>
{% endblock %}
```

```python
def get_categories_ga(self):
        result = '|'
        for category in self.categories.all():
            result+=category.name + '|'
        return result
```

## Refer
[GA set multiple categories](http://webmasters.stackexchange.com/questions/56501/google-analytics-assign-multiple-values-to-a-custom-variable-at-pagelevel)
