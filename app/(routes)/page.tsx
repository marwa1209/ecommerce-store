/** @format */
import { getBillboard, getProducts } from "@/data";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import {ProductList} from "@/components/product-list";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("df538c06-9e82-4a9d-a7ae-785e14855d00");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
