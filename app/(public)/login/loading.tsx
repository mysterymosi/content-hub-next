import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Field, FieldGroup } from "@/components/ui/field";

export default function LoginLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-64 mb-2" />
          <Skeleton className="h-4 w-80" />
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <Skeleton className="h-4 w-12 mb-2" />
              <Skeleton className="h-10 w-full" />
            </Field>
            <Field>
              <div className="flex items-center mb-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32 ml-auto" />
              </div>
              <Skeleton className="h-10 w-full" />
            </Field>
            <Field>
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
