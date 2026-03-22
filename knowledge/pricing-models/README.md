# 报价模型库

> 存放标准成本模型和报价模板，供 Cost Model Agent 调用参照。

## 目录结构

```
pricing-models/
├── README.md           # 本文件
├── <成本类型>/
│   ├── README.md       # 该类型模型说明
│   ├── model.yaml      # 标准模型定义
│   └── example.xlsx    # 示例数据
```

## 标准报价模型模板

```yaml
# 报价模型定义

model_name: xxx
version: x.x
last_updated: YYYY-MM-DD

# 成本要素定义
cost_components:
  - category: 人工成本
    items:
      - name: 收货员
        unit: 人/月
        unit_cost: xxx
        assumptions:
          - 班次: 日班/夜班
          - 加班费率: 1.5x

  - category: 仓租成本
    items:
      - name: 标准货架区
        unit: 元/m²/月
        unit_cost: xxx
        assumptions:
          - 租赁类型: 甲方提供/自租
          - 公摊系数: x%

  - category: 设备折旧
    items:
      - name: 货架系统
        unit: 元/月
        depreciation_years: 5
        residual_value: 10%

  - category: 包材成本
    items:
      - name: 标准纸箱
        unit: 元/票
        unit_cost: xxx
        assumptions:
          - 平均包材件数/订单: x

  - category: 管理费
    items:
      - name: 项目管理费
        rate: x% of total
        assumption: 含项目经理/QA

  - category: IT/系统
    items:
      - name: WMS license
        unit: 元/月
        unit_cost: xxx

  - category: 运输成本
    items:
      - name: 配送费
        unit: 元/票
        unit_cost: xxx
        assumptions:
          - 平均配送半径: x km
          - 车型: xxx

# 利润率建议
profit_margin:
  minimum: x%
  recommended: x%
  optimistic: x%

# 敏感性分析维度
sensitivity_factors:
  - 订单峰值系数: ±x%
  - 夜班比例: ±x%
  - 人员流失率: ±x%
  - 仓租涨幅: ±x%
```

## 适用场景

- 新项目报价参照
- 成本结构对标分析
- 敏感性分析基准设定
