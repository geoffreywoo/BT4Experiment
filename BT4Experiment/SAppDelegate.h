//
//  SAppDelegate.h
//  BT4Experiment
//
//  Created by Geoffrey Woo on 1/18/14.
//  Copyright (c) 2014 Geoffrey Woo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreBluetooth/CoreBluetooth.h>


@interface SAppDelegate : UIResponder <UIApplicationDelegate>
{
    CBCentralManager * manager;
    CBPeripheral * connected_peripheral;
}
@property (strong, nonatomic) UIWindow *window;

@end
