import Categories from '../Categories';
import FilterIcon from '../FilterIcon';

const OrderTab = () => {
  return (
    <section className="flex justify-between">
      <Categories />
      <FilterIcon />
    </section>
  );
};

export default OrderTab;
