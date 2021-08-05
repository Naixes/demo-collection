//具体的算法和策略类 相互独立
interface PriceStrategy {
  countPrice(originalPrice: number): number;
}

class PcStrategy implements PriceStrategy {
  public countPrice(originalPrice: number): number {
    return originalPrice * 0.5;
  }
}
class KcStrategy implements PriceStrategy {
  public countPrice(originalPrice: number): number {
    return originalPrice * 1;
  }
}
class HcStrategy implements PriceStrategy {
  public countPrice(originalPrice: number): number {
    return originalPrice * 2;
  }
}

class PriceContext {
  private riceStrategy: PriceStrategy;
  constructor(riceStrategy: PriceStrategy) {
    this.riceStrategy = riceStrategy;
  }
  public countPrice(originalPrice: number): number {
    return this.riceStrategy.countPrice(originalPrice);
  }
}
//具体行为策略
const pcStrategy: PriceStrategy = new PcStrategy();
const kcStrategy: PriceStrategy = new KcStrategy();
const hcStrategy: PriceStrategy = new HcStrategy();

//用户选择不同的策略
const pcContext: PriceContext = new PriceContext(pcStrategy);
const kcContext: PriceContext = new PriceContext(kcStrategy);
const hcContext: PriceContext = new PriceContext(hcStrategy);

console.log('拼车价格 = ' + pcContext.countPrice(10));
console.log('快车价格 = ' + kcContext.countPrice(10));
console.log('豪车价格 = ' + hcContext.countPrice(10));
