import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - 頁面不存在</h1>
        <p className="text-muted-foreground mb-8">抱歉，您訪問的頁面不存在。</p>
        <Button asChild>
          <Link to="/">��到首頁</Link>
        </Button>
      </div>
    </Layout>
  );
}
