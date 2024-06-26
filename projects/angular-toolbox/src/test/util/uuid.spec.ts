/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Uuid } from '../../public-api';

describe('Uuid', () => {

  const IN_VALID_UUID: string = "7cf27799-42944bca981ec325bac947b1";
  
  it('should have a private construnctor', () => {
    const ClassRef: any = Uuid;
    expect(()=> new ClassRef()).toThrowError("Uuid class has private constructor.");
  });
  
  it('build() should create a new Uuuid instance', () => {
    expect(Uuid.build()).toBeInstanceOf(Uuid);
  });
  
  it('fromString() should create a new Uuuid instance when the uuid parameter is a valid UUID', () => {
    expect(Uuid.fromString(crypto.randomUUID())).toBeInstanceOf(Uuid);
  });

  it('fromString() should throw an error when UUID already exists', () => {
    const uuid: string = crypto.randomUUID();
    Uuid.fromString(uuid);
    expect(()=> Uuid.fromString(uuid)).toThrowError("Data Integrity Violation. UUID already exists: " + uuid);
  });

  it('fromString() should throw an error when the uuid parameter is not a valid UUID', () => {
    expect(()=> Uuid.fromString(IN_VALID_UUID)).toThrowError("Invalid UUID value: " + IN_VALID_UUID);
  });
  
  it('validate() should return false when the uuid parameter is not a valid UUID', () => {
    expect(Uuid.validate(IN_VALID_UUID)).toBeFalse();
  });
  
  it('validate() should return true when the uuid parameter is a valid UUID', () => {
    expect(Uuid.validate(crypto.randomUUID())).toBeTrue();
  });
  
  it('toString() should return a string', () => {
    const uuid = Uuid.build();
    expect(typeof uuid.toString()).toEqual("string");
  });
  
  it('toString() should return a valid UUID representation of the Uuid instance', () => {
    const uuid = Uuid.build();
    expect(Uuid.validate(uuid.toString())).toBeTrue();
  });
  
  it('toString() should return a the same value as the uuid parameter of the fromString() method', () => {
    const randomUUID: string = crypto.randomUUID();
    const uuid = Uuid.fromString(randomUUID);
    expect(uuid.toString()).toEqual(randomUUID);
  });
});
