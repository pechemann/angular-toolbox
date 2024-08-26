/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxHttpRequestMetadataDto } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/io/atx-http-request-metadata.dto.ts";
import { RequestMetadataConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/request-metadata-converter";
import { HttpMockRequestMetadata, Uuid } from "projects/angular-toolbox/src/public-api";

describe('RequestMetadataConverter', () => {

    const url: string = "http://fake-url.com";
    const metadata: HttpMockRequestMetadata = {
        duration: 260,
        stalled: 964,
        start: 695,
        url: new URL(url),
        id: Uuid.build()
    };

    const dto: AtxHttpRequestMetadataDto = {
        duration: 260,
        stalled: 964,
        start: 695,
        url: url,
        id: Uuid.build().toString()
    }

    it('requestMetadataToDto() should return a AtxHttpRequestMetadataDto object', () => {
        const result: any = RequestMetadataConverter.requestMetadataToDto(metadata);
        expect(result.hasOwnProperty("duration")).toBeTrue();
        expect(result.hasOwnProperty("stalled")).toBeTrue();
        expect(result.hasOwnProperty("start")).toBeTrue();
        expect(result.hasOwnProperty("url")).toBeTrue();
        expect(result.hasOwnProperty("id")).toBeTrue();
    });

    it('AtxHttpRequestMetadataDto.duration should be set with the specified parameters', () => {
        const result: any = RequestMetadataConverter.requestMetadataToDto(metadata);
        expect(result.duration).toEqual(metadata.duration);
    });

    it('AtxHttpRequestMetadataDto.stalled should be set with the specified parameters', () => {
        const result: any = RequestMetadataConverter.requestMetadataToDto(metadata);
        expect(result.stalled).toEqual(metadata.stalled);
    });

    it('AtxHttpRequestMetadataDto.start should be set with the specified parameters', () => {
        const result: any = RequestMetadataConverter.requestMetadataToDto(metadata);
        expect(result.start).toEqual(metadata.start);
    });

    it('AtxHttpRequestMetadataDto.url should be set with the specified parameters', () => {
        const result: any = RequestMetadataConverter.requestMetadataToDto(metadata);
        expect(result.url).toEqual(metadata.url.toString());
    });

    it('AtxHttpRequestMetadataDto.id should be set with the specified parameters', () => {
        const result: any = RequestMetadataConverter.requestMetadataToDto(metadata);
        expect(result.id).toEqual(metadata.id.toString());
    });
    
    it('dtoToRequestMetadata() should return a HttpMockRequestMetadata object', () => {
        const result: any = RequestMetadataConverter.dtoToRequestMetadata(dto);
        expect(result.hasOwnProperty("duration")).toBeTrue();
        expect(result.hasOwnProperty("stalled")).toBeTrue();
        expect(result.hasOwnProperty("start")).toBeTrue();
        expect(result.hasOwnProperty("url")).toBeTrue();
        expect(result.hasOwnProperty("id")).toBeTrue();
    });

    it('HttpMockRequestMetadata.duration should be set with the specified parameters', () => {
        const result: any = RequestMetadataConverter.dtoToRequestMetadata(dto);
        expect(result.duration).toEqual(dto.duration);
    });

    it('HttpMockRequestMetadata.stalled should be set with the specified parameters', () => {
        const result: any = RequestMetadataConverter.dtoToRequestMetadata(dto);
        expect(result.stalled).toEqual(dto.stalled);
    });

    it('HttpMockRequestMetadata.start should be set with the specified parameters', () => {
        const result: any = RequestMetadataConverter.dtoToRequestMetadata(dto);
        expect(result.start).toEqual(dto.start);
    });

    it('HttpMockRequestMetadata.url should be set with the specified parameters', () => {
        const result: any = RequestMetadataConverter.dtoToRequestMetadata(dto);
        expect(result.url).toEqual(new URL(dto.url));
    });

    it('HttpMockRequestMetadata.id should be set with the specified parameters', () => {
        const result: any = RequestMetadataConverter.dtoToRequestMetadata(dto);
        expect(result.id).toEqual(Uuid.fromString(dto.id));
    });
});
