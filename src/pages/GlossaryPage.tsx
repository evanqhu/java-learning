const terms = [
  ['JVM', 'Java Virtual Machine，执行 Java 字节码的虚拟机。'],
  ['JDK', 'Java Development Kit，包含编译器、运行时与开发工具。'],
  ['Maven', 'Java 依赖管理和构建工具，核心配置文件是 pom.xml。'],
  ['Bean', '由 Spring 容器创建、连接并管理的对象。'],
  ['IoC', '控制反转：对象不再自己组装依赖，而由容器负责。'],
  ['DTO', 'Data Transfer Object，描述接口输入或输出的数据形状。'],
  ['Entity', '与数据库表映射的持久化对象。'],
  ['Repository', '持久化访问层；在本 demo 中由 Spring Data JPA 实现。'],
  ['Profile', '一组环境配置标识，例如 dev、test、prod。'],
  ['JAR', 'Java Archive，可包含应用类、资源和依赖的运行制品。'],
  ['Annotation', '以 @ 开头的元数据，Spring 用它声明路由、组件和校验规则。'],
  ['Classpath', 'JVM 和编译器寻找 class 与资源的路径集合。'],
]

export default function GlossaryPage() {
  return <div className="glossary page-enter"><p className="eyebrow">QUICK REFERENCE</p><h1>术语速查</h1><p className="glossary-lead">不用先背。遇到一个，回来查一个。</p><div className="term-grid">{terms.map(([term, definition]) => <article key={term}><code>{term}</code><p>{definition}</p></article>)}</div></div>
}
