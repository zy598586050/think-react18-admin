import React, { Suspense } from "react";
import Loading from '@/components/loading'

const lazyLoad = (OtherComponent: React.LazyExoticComponent<() => JSX.Element>) => {
    return <Suspense fallback={<Loading />}>
        <OtherComponent />
    </Suspense>
}

export default lazyLoad