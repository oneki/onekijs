import { AnonymousObject } from '@oneki/types';
interface StaticProps extends AnonymousObject {
    props?: AnonymousObject;
}
export declare const withI18nStaticProps: (locale: string, staticProps?: StaticProps | undefined, namespaces?: string[]) => any;
export {};
