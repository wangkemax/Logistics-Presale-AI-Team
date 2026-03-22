# 投标书模板库

> 存放标准投标书模板和章节段落库，供 Tender Writer Agent 调用参照。

## 目录结构

```
proposal-templates/
├── README.md           # 本文件
├── full-templates/     # 完整投标书模板
├── section-blocks/     # 章节段落库
└── language-patterns/  # 表达语言模式
```

## 完整模板结构

```
proposal-templates/full-templates/
├── standard-logistics.yaml    # 物流服务投标书标准模板
├── cold-chain.yaml           # 冷链物流投标书模板
├── e-commerce.yaml          # 电商仓配投标书模板
└── <行业>-proposal.yaml      # 按行业扩展
```

### 标准投标书模板章节

```yaml
# 物流服务投标书标准模板

template_name: 物流服务投标书标准模板
version: x.x
applicable_to: 通用物流/仓储/供应链投标

chapters:
  - chapter: 1. 项目理解
    sections:
      - 项目背景理解
      - 客户需求分析
      - 关键挑战识别
      - 我们对项目的理解

  - chapter: 2. 服务范围
    sections:
      - 服务内容定义
      - 服务边界（in-scope / out-of-scope）
      - 增值服务选项

  - chapter: 3. 物流解决方案
    sections:
      - 方案概览
      - 仓储运营方案
      - 运输配送方案
      - 系统支持方案
      - 质量保障方案

  - chapter: 4. 实施计划
    sections:
      - 实施方法论
      - 项目时间表
      - 关键里程碑
      - 风险应对

  - chapter: 5. 组织架构
    sections:
      - 项目团队结构
      - 核心岗位说明
      - 人员简历

  - chapter: 6. KPI 与服务等级
    sections:
      - KPI 指标体系
      - 服务等级承诺
      - 监控与报告机制

  - chapter: 7. 风险管理
    sections:
      - 风险识别
      - 风险评级
      - 应对措施

  - chapter: 8. 创新与差异化
    sections:
      - 核心优势
      - 增值服务
      - 持续改善机制

  - chapter: 9. 商务报价
    sections:
      - 报价说明
      - 成本结构
      - 付款条件
```

## 章节段落库

```
proposal-templates/section-blocks/
├── 方案亮点表达/
│   ├── 成本优化类.yaml
│   ├── 效率提升类.yaml
│   └── 服务保障类.yaml
├── 招标响应语言/
│   ├── 积极响应表达.yaml
│   ├── 能力证明表达.yaml
│   └── 承诺保障表达.yaml
└── 专业术语/
    └── 物流行业标准术语.yaml
```

## 语言表达模式

```
proposal-templates/language-patterns/
├── 开头表达.yaml      # 各章节开头常用表达
├── 转折表达.yaml      # 承接/对比/转折
├── 强调表达.yaml      # 重点强调句式
└── 结尾表达.yaml      # 各章节结尾常用表达
```
