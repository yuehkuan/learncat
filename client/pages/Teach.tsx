import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, DollarSign, Users, TrendingUp } from "lucide-react";

export default function Teach() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">開始你的教學之旅</h1>
          <p className="text-lg text-muted-foreground">
            分享你的專業知識，創造被動收入，影響全球學習者的生活
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <DollarSign className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">創造收入</h3>
              <p className="text-sm text-muted-foreground">
                分享知識賺取收入，創造可持續的被動收入來源
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">影響他人</h3>
              <p className="text-sm text-muted-foreground">
                幫助學習者提升技能，改變他們的職業生涯
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">建立品牌</h3>
              <p className="text-sm text-muted-foreground">
                建立個人專業品牌，成為領域內的意見領袖
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <GraduationCap className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">持續學習</h3>
              <p className="text-sm text-muted-foreground">
                教學過程中不斷精進，加深對專業領域的理解
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">準備開始教學？</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              我們的講師平台即將推出，提供完整的課程製作工具、行銷支援和收益分析。
              現在申請成為創始講師，享有優先使用權和特殊優惠。
            </p>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="text-left space-y-2">
                  <h4 className="font-medium">平台特色：</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 完整課程製作工具</li>
                    <li>• 多媒體內容支援</li>
                    <li>• 學員互動功能</li>
                    <li>• 即時收益分析</li>
                  </ul>
                </div>
                <div className="text-left space-y-2">
                  <h4 className="font-medium">講師支援：</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 專業培訓課程</li>
                    <li>• 行銷推廣協助</li>
                    <li>• 技術客服支援</li>
                    <li>• 講師社群交流</li>
                  </ul>
                </div>
              </div>
              <Button size="lg" className="w-full">
                申請成為講師
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
