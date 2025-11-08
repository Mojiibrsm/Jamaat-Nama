
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="flex-1 p-4 sm:px-6 sm:py-0">
      <Card>
        <CardHeader>
          <CardTitle>সেটিংস</CardTitle>
          <CardDescription>
            ওয়েবসাইটের সাধারণ সেটিংস এখানে পরিবর্তন করুন।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="site-name">সাইটের নাম</Label>
                <Input id="site-name" defaultValue="Jamaat Nama" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="admin-email">অ্যাডমিন ইমেইল</Label>
                <Input id="admin-email" type="email" defaultValue="admin@example.com" />
            </div>
            <Button>সংরক্ষণ করুন</Button>
        </CardContent>
      </Card>
    </div>
  );
}
