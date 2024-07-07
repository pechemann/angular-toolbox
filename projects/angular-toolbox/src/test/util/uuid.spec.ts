/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
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

  it('fromString() should throw an error when UUID already exists and track parameters is true', () => {
    const uuid: string = crypto.randomUUID();
    Uuid.fromString(uuid, true);
    expect(()=> Uuid.fromString(uuid, true)).toThrowError("Data Integrity Violation. UUID already exists: " + uuid);
  });

  it('fromString() should create a tracked UUID when the track parameter is true', () => {
    const uuid: string = crypto.randomUUID();
    Uuid.fromString(uuid, true);
    expect(Uuid.isTracked(uuid)).toBeFalse();
  });

  it('isTracked() should return true for untracked UUIDs', () => {
    const uuid: string = crypto.randomUUID();
    expect(Uuid.isTracked(uuid)).toBeTrue();
  });

  it('isTracked() should return true for tracked UUIDs', () => {
    const instance = Uuid.build(true);
    expect(Uuid.isTracked(instance.toString())).toBeFalse();
  });

  it('build() must create untracked Uuid instance if track parameters is false (default)', () => {
    const instance = Uuid.build();
    expect(Uuid.isTracked(instance.toString())).toBeTrue();
  });
  
  it('build() must create untracked Uuid instance if track parameters is true', () => {
    const instance = Uuid.build(true);
    expect(Uuid.isTracked(instance.toString())).toBeFalse();
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
  
  it('equals() should return false when Uuid instances are different', () => {
    const uuid1 = Uuid.build();
    const uuid2 = Uuid.build();
    expect(uuid1.equals(uuid2)).toBeFalse();
  });
  
  it('equals() should return true when Uuid instances are identical', () => {
    const uuid1 = Uuid.build();
    const uuid2 = uuid1;
    expect(uuid1.equals(uuid2)).toBeTrue();
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
  
  it('destroy() should remove the UUID reference from the system', () => {
    const randomUUID: string = crypto.randomUUID();
    const uuid = Uuid.fromString(randomUUID);
    uuid.destroy();
    expect(()=> Uuid.fromString(randomUUID)).not.toThrow();
  });
  
  it('destroy() should return false whether the Uuid parameters is not tracked', () => {
    const uuid = Uuid.build();
    expect(uuid.destroy()).toBeFalse();
  });
  
  it('destroy() should return true whether the Uuid parameters is tracked', () => {
    const uuid = Uuid.build(true);
    expect(uuid.destroy()).toBeTrue();
  });
});
