//
//  RootViewController.h
//  BT4Experiment
//
//  Created by Geoffrey Woo on 1/18/14.
//  Copyright (c) 2014 Geoffrey Woo. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RootViewController : UIViewController

@property (weak, nonatomic) IBOutlet UIButton *advertiseButton;
@property (weak, nonatomic) IBOutlet UIButton *readButton;

-(IBAction)advertisesMode:(UIButton *)sender;
-(IBAction)readMode:(UIButton *)sender;

@end
